using corona_server_side_asp.net.IRepositories;
using corona_server_side_asp.net.Models.Tables;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace corona_server_side_asp.net.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TablesController : ControllerBase
    {
        private readonly ITablesRepository _tablesRepository;

        public TablesController(ITablesRepository tablesRepository)
        {
            _tablesRepository = tablesRepository;
        }

        [HttpPost("{sectionId}")]
        public async Task<IActionResult> AddTableToSection(int sectionId, [FromBody] TableModel table)
        {
            if (table == null) return BadRequest("Table data is required.");

            try
            {
                var result = await _tablesRepository.AddTableToSection(sectionId, table);
                return Ok(new { Message = "Table added successfully", RowsAffected = result });
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("{sectionId}/{tableId}")]
        public async Task<IActionResult> GetTable(int sectionId, int tableId)
        {
            try
            {
                var table = await _tablesRepository.GetTable(sectionId, tableId);
                return Ok(table);
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
