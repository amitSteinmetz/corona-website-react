﻿using JsonSubTypes;
using Newtonsoft.Json;

namespace corona_server_side_asp.net.Models.Cards
{
    [JsonConverter(typeof(JsonSubtypes), "Type")]
    [JsonSubtypes.KnownSubType(typeof(TextualCardModel), "textual")]
    [JsonSubtypes.KnownSubType(typeof(GraphicalCardModel), "graphical")]
    [JsonSubtypes.KnownSubType(typeof(ContainerCardModel), "container")]
    public class CardModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Type { get; set; }
    }
}
