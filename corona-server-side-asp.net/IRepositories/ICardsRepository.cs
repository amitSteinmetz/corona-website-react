using corona_server_side_asp.net.Models.Cards;

namespace corona_server_side_asp.net.IRepositories
{
    public interface ICardsRepository
    {
        Task<int> AddCardToSectionAsync(int sectionId, CardModel card);
        Task<List<CardModel>> GetSectionCardsAsync(int sectionId);
    }
}