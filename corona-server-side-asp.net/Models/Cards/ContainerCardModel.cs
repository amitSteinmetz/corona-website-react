namespace corona_server_side_asp.net.Models.Cards
{
    public class ContainerCardModel : CardModel
    {
        public int Id { get; set; }
        public List<TextualCardModel>? InnerTextualCards { get; set; }
        public List<GraphicalCardModel>? InnerGraphicalCards { get; set; }
        public List<ContainerCardModel>? InnerContainerCards { get; set; }
    }
}
