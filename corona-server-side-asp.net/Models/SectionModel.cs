using corona_server_side_asp.net.Models.Cards;

namespace corona_server_side_asp.net.Models
{
    public class SectionModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public List<string>? RelatedLinks { get; set; }
        public List<TextualCardModel>? TextualCards { get; set; }
        public List<GraphicalCardModel>? GraphicalCards { get; set; }
        public List<ContainerCardModel>? ContainerCards { get; set; }
    }
}
