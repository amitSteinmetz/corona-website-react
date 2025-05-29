using corona_server_side_asp.net.Models.Cards;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace corona_server_side_asp.net.Helpers;

public class CardModelConverter : JsonConverter<CardModel>
{
    public override CardModel? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        using var document = JsonDocument.ParseValue(ref reader);
        var root = document.RootElement;

        if (!root.TryGetProperty("Type", out var cardTypeElement))
        {
            throw new JsonException("Missing 'Type' discriminator.");
        }

        var cardType = cardTypeElement.GetString();

        return cardType?.ToLower() switch
        {
            "textual" => JsonSerializer.Deserialize<TextualCardModel>(root.GetRawText(), options),
            "graphical" => JsonSerializer.Deserialize<GraphicalCardModel>(root.GetRawText(), options),
            "container" => JsonSerializer.Deserialize<ContainerCardModel>(root.GetRawText(), options),
            _ => throw new JsonException($"Unknown card type: {cardType}")
        };
    }

    public override void Write(Utf8JsonWriter writer, CardModel value, JsonSerializerOptions options)
    {
        JsonSerializer.Serialize(writer, (object)value, value.GetType(), options);
    }
}

