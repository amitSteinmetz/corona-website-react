using System.ComponentModel.DataAnnotations.Schema;

namespace corona_server_side_asp.net.Models.Cards
{
    public class TextualCardModel : CardModel
    {
        public int Id { get; set; }
        public List<CardTextDataModel>? Data { get; set; }
    }
}
