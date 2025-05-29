using corona_server_side_asp.net.IRepositories;
using corona_server_side_asp.net.Models.Cards;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace corona_server_side_asp.net.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardsController : ControllerBase
    {
        private readonly ICardsRepository _cardsRepository;

        public CardsController(ICardsRepository cardsRepository)
        {
            _cardsRepository = cardsRepository;
        }

        [HttpPost("{sectionId}")]
        public async Task<IActionResult> AddCardToSection(int sectionId, [FromBody] CardModel card)
        {

            var result = await _cardsRepository.AddCardToSectionAsync(sectionId, card);

            return (result != -1) ? Ok("Card added successfully.") : NotFound("Section not found.");
        }

        [HttpGet("{sectionId}")]
        public async Task<IActionResult> GetSectionCards(int sectionId)
        {
            var cards = await _cardsRepository.GetSectionCardsAsync(sectionId);
            return (cards != null) ? Ok(cards) : NotFound("No cards here");
        }
    }
}
