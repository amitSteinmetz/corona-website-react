using corona_server_side_asp.net.Data;
using corona_server_side_asp.net.Helpers;
using corona_server_side_asp.net.IRepositories;
using corona_server_side_asp.net.Models;
using corona_server_side_asp.net.Models.Cards;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Nodes;
using System.Text.Json;
using corona_server_side_asp.net.Migrations;

namespace corona_server_side_asp.net.Repositories
{
    public class CardsRepository : ICardsRepository
    {
        private readonly CoronaDataContext _context;
        private readonly IWebHostEnvironment _env;

        public CardsRepository(CoronaDataContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        public async Task<List<CardModel>> GetSectionCardsAsync(int sectionId)
        {
            if (sectionId <= 0) return null;

            var section = await _context.Sections
                .Include(s => s.Cards)
                .FirstOrDefaultAsync(s => s.Id == sectionId);

            if (section == null) return null;

            return section.Cards;
        }

        public async Task<int> AddCardToSectionAsync(int sectionId, CardModel card)
        {
            var section = await _context.Sections
                .Include(s => s.Cards)
                .FirstOrDefaultAsync(s => s.Id == sectionId);

            if (section == null) return -1;

            section.Cards.Add(card);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> AddChildToContainerCard(int sectionId, int containerCardId, CardModel card)
        {
            var section = await _context.Sections
                .Include(s => s.Cards)
                .FirstOrDefaultAsync(s => s.Id == sectionId);

            if (section == null) return -1;

            var containerCard = section.Cards
                .FirstOrDefault(c => c.Id == containerCardId && c.Type == "container") as ContainerCardModel;

            if (containerCard == null) return -1;

            containerCard.Children.Add(card);

            return await _context.SaveChangesAsync();
        }

        public async Task<string> GetCardSectionTitle(int sectionId)
        {
            var section = await _context.Sections
                .FirstOrDefaultAsync(s => s.Id == sectionId);

            return section == null ? "" : section.Title;
        }

        public async Task<CardModel> GetCard(int sectionId, int cardId)
        {
            var section = await _context.Sections
                .Include(s => s.Cards)
                .FirstOrDefaultAsync(s => s.Id == sectionId);

            if (section == null) return null;

            var card = section.Cards.FirstOrDefault(c => c.Id == cardId);
            return card ?? null;
        }

        public void WriteExcelDataToCards(ref List<SectionModel> sections)
        {
            foreach (var section in sections)
            {
                foreach (var card in section.Cards)
                {
                    WriteExcelDataToCard(card, section.Title, card.ExcelFileName);
                }
            }
        }

        private void WriteExcelDataToCard(CardModel card, string sectionTitle, string fileName)
        {
            if (!(card is ContainerCardModel))
            {
                var excelPath = Path.Combine(_env.ContentRootPath, "Excels", "Sections", sectionTitle, fileName);
                var parsedData = ExcelDataParser.Parse(excelPath);

                if (card is TextualCardModel textualCard)
                {
                    textualCard.Data = parsedData
                    .Select(d => new CardTextDataModel
                    {
                        Text = d.TryGetValue("key", out string? text) ? text : "",
                        Amount = d.TryGetValue("value", out string? amount) ? amount : "",
                    })
                    .ToList();
                }

                else if (card is GraphicalCardModel graphicalCard)
                {
                    var optionsNode = JsonNode.Parse(graphicalCard.Options);
                    if (optionsNode is JsonObject options)
                    {
                        var keys = parsedData.Select(dict => dict.TryGetValue("key", out var k) ? k : "").ToHashSet();
                        var values = parsedData.Select(dict => dict.TryGetValue("value", out var v) ? v : "").ToList();
                        var groups = parsedData.Select(dict => dict.TryGetValue("group", out var avg) ? avg : "").Distinct().ToList();

                        if (options["xAxis"] is not JsonObject xAxis)
                        {
                            xAxis = new JsonObject();
                            options["xAxis"] = xAxis;
                        }
                        xAxis["data"] = JsonSerializer.SerializeToNode(keys);

                        if (options["series"] is not JsonArray seriesArray)
                        {
                            seriesArray = new JsonArray();
                            options["series"] = seriesArray;
                        }

                        if (groups.Count > 1)
                        {
                            var legend = new JsonObject();
                            var legendDataArray = new JsonArray();

                            options["legend"] = legend;
                            legend["data"] = legendDataArray;

                            while (seriesArray.Count < groups.Count)
                                seriesArray.Add(new JsonObject());

                            while (seriesArray.Count > groups.Count)
                                seriesArray.RemoveAt(seriesArray.Count - 1);

                            for (int i = 0; i < groups.Count; i++)
                            {
                                var groupName = groups[i];
                                var groupValues = parsedData
                                    .Where(dict => dict.TryGetValue("group", out var g) && g == groupName)
                                    .Select(dict => dict.TryGetValue("value", out var v) ? v : "")
                                    .ToList();

                                legendDataArray.Add(new JsonObject { ["name"] = groupName, ["icon"] = "circle" });

                                if (seriesArray[i] is not JsonObject seriesObj)
                                {
                                    seriesObj = new JsonObject();
                                    seriesArray[i] = seriesObj;
                                }

                                seriesObj["name"] = groupName;
                                seriesObj["type"] = "line";
                                seriesObj["symbol"] = "circle";
                                seriesObj["symbolSize"] = 6;
                                seriesObj["data"] = JsonSerializer.SerializeToNode(groupValues);
                            }
                        }

                        else
                        {
                            if (seriesArray.Count == 0 || seriesArray[0] == null) throw new InvalidOperationException("Series array is empty or null.");
                            seriesArray[0]["data"] = JsonSerializer.SerializeToNode(values);

                            if (seriesArray[0]["markArea"] is JsonObject)
                            {
                                if (seriesArray[0]["markArea"]["data"] is JsonArray markAreaData)
                                {
                                    markAreaData.Clear();
                                    var xAxisDataArray = xAxis["data"] as JsonArray;
                                    
                                    for (int i = 1; i < xAxisDataArray.Count; i += 2)
                                    {
                                        if (i + 1 < xAxisDataArray.Count)
                                        {
                                            markAreaData.Add(new JsonArray
                                            {
                                                new JsonObject { ["xAxis"] = xAxisDataArray[i].ToString() },
                                                new JsonObject { ["xAxis"] = xAxisDataArray[i + 1].ToString() }
                                            });
                                        }
                                    }

                                    seriesArray[0]["markArea"]["data"] = markAreaData;
                                }
                            }
                        }

                        graphicalCard.Options = options.ToJsonString(new JsonSerializerOptions { WriteIndented = false });
                    }
                }
            }
            else if (card is ContainerCardModel containerCard && containerCard.Children != null)
            {
                foreach (var child in containerCard.Children)
                {
                    WriteExcelDataToCard(child, sectionTitle, child.ExcelFileName);
                }
            }
        }

        public async Task<CardModel> ChangeGraphDataSource(int sectionId, int cardId, string period)
        {
            var card = await GetCard(sectionId, cardId);
            if (card == null) return null;

            if (card is GraphicalCardModel graphicalCard)
            {
                var fileName = $"{period}.xlsx";
                WriteExcelDataToCard(graphicalCard, await GetCardSectionTitle(sectionId), fileName);
                graphicalCard.ExcelFileName = fileName;
                await _context.SaveChangesAsync();
                return graphicalCard;
            }
            else throw new InvalidOperationException("Card is not a graphical card.");
        }

        //public async Task<int> AddDescriptionToCard(int sectionId, int cardId, string description)
        //{
        //    var card = await GetCard(sectionId, cardId);
        //    if (card == null) return -1;

        //    card.Description = description;
        //    return await _context.SaveChangesAsync();
        //}
    }
}
