using corona_server_side_asp.net.IRepositories;
using corona_server_side_asp.net.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace corona_server_side_asp.net.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SectionsController : ControllerBase
    {
        private readonly ISectionsRepository _sectionsRepository;

        public SectionsController(ISectionsRepository sectionsRepository)
        {
            _sectionsRepository = sectionsRepository;
        }

        [HttpGet("")]
        public async Task<IActionResult> GetSections()
        {
            var sections = await _sectionsRepository.GetSectionsAsync();

            return (sections == null) ? NotFound("No sections found.") : Ok(sections);
        }

        [HttpPost("")]
        public async Task<IActionResult> AddSection([FromBody] SectionModel section)
        {

            var result = await _sectionsRepository.AddSectionAsync(section);
            return CreatedAtAction(nameof(AddSection), new { id = section.Id }, section);
        }
    }
}
