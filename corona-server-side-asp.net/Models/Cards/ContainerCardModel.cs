namespace corona_server_side_asp.net.Models.Cards
{
    public class ContainerCardModel : CardModel
    {
        public List<CardModel> Children { get; set; } = new();
    }
}
