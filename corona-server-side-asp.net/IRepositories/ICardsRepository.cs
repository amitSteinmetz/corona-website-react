using corona_server_side_asp.net.Models.Cards;

namespace corona_server_side_asp.net.IRepositories
{
    public interface ICardsRepository
    {
        Task<int> AddTextualCardToSectionAsync(int sectionId, TextualCardModel card);
        Task<int> AddContainerCardToSectionAsync(int sectionId, ContainerCardModel card);
        Task<int> AddGraphicalCardToSectionAsync(int sectionId, GraphicalCardModel card);
        Task<List<TextualCardModel>> GetSectionTextualCardsAsync(int sectionId);
        Task<List<GraphicalCardModel>> GetSectionGraphicalCardsAsync(int sectionId);
        Task<List<ContainerCardModel>> GetSectionContainerCardsAsync(int sectionId);
    }
}