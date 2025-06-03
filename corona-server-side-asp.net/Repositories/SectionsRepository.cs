using corona_server_side_asp.net.Data;
using corona_server_side_asp.net.Helpers;
using corona_server_side_asp.net.IRepositories;
using corona_server_side_asp.net.Models;
using corona_server_side_asp.net.Models.Cards;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Nodes;
using System.Text.Json;
using static System.Collections.Specialized.BitVector32;

namespace corona_server_side_asp.net.Repositories
{
    public class SectionsRepository : ISectionsRepository
    {
        private readonly CoronaDataContext _context;
        private readonly IWebHostEnvironment _env;


        public SectionsRepository(CoronaDataContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        public async Task<List<SectionModel>> GetSectionsAsync()
        {
            await PreloadCardTypes();

            var sections = await _context.Sections
                .Include(s => s.Cards)
                .ToListAsync();

            WriteExcelDataToCards(ref sections);

            return sections;
        }

        public async Task<int> AddSectionAsync(SectionModel section)
        {
            if (section == null) return -1;

            _context.Sections.Add(section);
            return await _context.SaveChangesAsync();
        }
        private async Task PreloadCardTypes()
        {
            await _context.Set<TextualCardModel>().Include(tc => tc.Data).LoadAsync();
            await _context.Set<ContainerCardModel>().Include(cc => cc.Children).LoadAsync();
            await _context.Set<GraphicalCardModel>().LoadAsync();
        }

        private void WriteExcelDataToCards(ref List<SectionModel> sections)
        {
            foreach (var section in sections)
            {
                foreach (var card in section.Cards)
                {
                    WriteExcelDataToCard(card, section.Title);
                }
            }
        }

        private void WriteExcelDataToCard(CardModel card, string sectionTitle)
        {
            if (!(card is ContainerCardModel))
            {
                var excelPath = Path.Combine(_env.ContentRootPath, "Excels", "Sections", sectionTitle, card.ExcelFileName);
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

                }
            }
            else if (card is ContainerCardModel containerCard && containerCard.Children != null)
            {
                foreach (var child in containerCard.Children)
                {
                    WriteExcelDataToCard(child, sectionTitle);
                }
            }
        }
    }
}
