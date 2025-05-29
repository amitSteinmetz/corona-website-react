using corona_server_side_asp.net.Data;
using corona_server_side_asp.net.Helpers;
using corona_server_side_asp.net.IRepositories;
using corona_server_side_asp.net.Models;
using corona_server_side_asp.net.Models.Cards;
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

        public async Task<int> AddTextualCardToSectionAsync(int sectionId, TextualCardModel card)
        {

            var section = await _context.Sections
                .Include(s => s.TextualCards)
                .FirstOrDefaultAsync(s => s.Id == sectionId);

            if (section == null) return -1;

            if (section.TextualCards == null)
                section.TextualCards = new List<TextualCardModel>();

            section.TextualCards.Add(card);

            return await _context.SaveChangesAsync();
        }

        public async Task<int> AddGraphicalCardToSectionAsync(int sectionId, GraphicalCardModel card)
        {

            var section = await _context.Sections
                .Include(s => s.GraphicalCards)
                .FirstOrDefaultAsync(s => s.Id == sectionId);

            if (section == null) return -1;

            if (section.GraphicalCards == null)
                section.GraphicalCards = new List<GraphicalCardModel>();

            section.GraphicalCards.Add(card);

            return await _context.SaveChangesAsync();
        }

        public async Task<int> AddContainerCardToSectionAsync(int sectionId, ContainerCardModel card)
        {

            var section = await _context.Sections
                .Include(s => s.ContainerCards)
                .FirstOrDefaultAsync(s => s.Id == sectionId);

            if (section == null) return -1;

            if (section.ContainerCards == null)
                section.ContainerCards = new List<ContainerCardModel>();

            section.ContainerCards.Add(card);

            return await _context.SaveChangesAsync();
        }

        public async Task<List<TextualCardModel>> GetSectionTextualCardsAsync(int sectionId)
        {
            var section = await _context.Sections
                .Include(s => s.TextualCards)
                .FirstOrDefaultAsync(s => s.Id == sectionId);

            if (section == null || section.TextualCards == null) return null;

            return section.TextualCards.ToList();
        }

        public async Task<List<GraphicalCardModel>> GetSectionGraphicalCardsAsync(int sectionId)
        {
            var section = await _context.Sections
                .Include(s => s.GraphicalCards)
                .FirstOrDefaultAsync(s => s.Id == sectionId);

            if (section == null || section.GraphicalCards == null) return null;

            return section.GraphicalCards.ToList();
        }

        public async Task<List<ContainerCardModel>> GetSectionContainerCardsAsync(int sectionId)
        {
            var section = await _context.Sections
                .Include(s => s.ContainerCards)
                .FirstOrDefaultAsync(s => s.Id == sectionId);

            if (section == null || section.ContainerCards == null) return null;

            return section.ContainerCards.ToList();
        }

    }
}


    

