using corona_server_side_asp.net.Data;
using corona_server_side_asp.net.Helpers;
using corona_server_side_asp.net.IRepositories;
using corona_server_side_asp.net.Models;
using corona_server_side_asp.net.Models.Cards;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace corona_server_side_asp.net.Repositories
{
    public class CardsRepository : ICardsRepository
    {
        private readonly CoronaDataContext _context;
        public CardsRepository(CoronaDataContext context)
        {
            _context = context;
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
    }
}




