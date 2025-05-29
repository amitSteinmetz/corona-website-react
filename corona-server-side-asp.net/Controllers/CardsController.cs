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

        [HttpPost("add-textual-card/{sectionId}")]
        public async Task<IActionResult> AddTextualCardToSection(int sectionId, [FromBody] TextualCardModel card)
        {

            var result = await _cardsRepository.AddTextualCardToSectionAsync(sectionId, card);

            return (result != -1) ? Ok("Card added successfully.") : NotFound("Section not found.");
        }

        [HttpPost("add-graphical-card/{sectionId}")]
        public async Task<IActionResult> AddGraphicalCardToSection(int sectionId, [FromBody] GraphicalCardModel card)
        {

            var result = await _cardsRepository.AddGraphicalCardToSectionAsync(sectionId, card);

            return (result != -1) ? Ok("Card added successfully.") : NotFound("Section not found.");
        }

        [HttpPost("add-container-card/{sectionId}")]
        public async Task<IActionResult> AddContainerCardToSection(int sectionId, [FromBody] ContainerCardModel card)
        {

            var result = await _cardsRepository.AddContainerCardToSectionAsync(sectionId, card);

            return (result != -1) ? Ok("Card added successfully.") : NotFound("Section not found.");
        }

        [HttpGet("get-textual-cards/{sectionId}")]
        public async Task<IActionResult> GetSectionTextualCards(int sectionId)
        {
            var cards = await _cardsRepository.GetSectionTextualCardsAsync(sectionId);
            return (cards != null) ? Ok(cards) : NotFound("No cards here");
        }

        [HttpGet("get-graphical-cards/{sectionId}")]
        public async Task<IActionResult> GetSectionGraphicalCards(int sectionId)
        {
            var cards = await _cardsRepository.GetSectionGraphicalCardsAsync(sectionId);
            return (cards != null) ? Ok(cards) : NotFound("No cards here");
        }

        [HttpGet("get-container-cards/{sectionId}")]
        public async Task<IActionResult> GetSectionContainerCards(int sectionId)
        {
            var cards = await _cardsRepository.GetSectionContainerCardsAsync(sectionId);
            return (cards != null) ? Ok(cards) : NotFound("No cards here");
        }
    }
}
