using corona_server_side_asp.net.Models.Cards;
using JsonSubTypes;
using Newtonsoft.Json;

namespace corona_server_side_asp.net.Models.Tables
{
    [JsonConverter(typeof(JsonSubtypes), "Type")]
    [JsonSubtypes.KnownSubType(typeof(HospitalBedOccupancyTable), "hospitalBedOccupancy")]
    public class TableModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public List<string> Columns { get; set; } = new();
    }
}
