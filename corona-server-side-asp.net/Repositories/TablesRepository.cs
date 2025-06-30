using corona_server_side_asp.net.Data;
using corona_server_side_asp.net.IRepositories;
using corona_server_side_asp.net.Models.Cards;
using corona_server_side_asp.net.Models.Tables;
using Microsoft.EntityFrameworkCore;

namespace corona_server_side_asp.net.Repositories
{
    public class TablesRepository : ITablesRepository
    {
        private readonly CoronaDataContext _context;

        public TablesRepository(CoronaDataContext context)
        {
            _context = context;
        }

        public async Task<int> AddTableToSection(int sectionId, TableModel table)
        {
            var section = await _context.Sections
                .FirstOrDefaultAsync(s => s.Id == sectionId);
            if (section == null) throw new ArgumentException("Section not found");

            section.Tables.Add(table);
            return await _context.SaveChangesAsync();
        }

        public async Task<TableModel> GetTable(int sectionId, int tableId)
        {
            var section = await _context.Sections
                .Include(s => s.Tables)
                .FirstOrDefaultAsync(s => s.Id == sectionId);

            if (section == null) throw new ArgumentException("Section not found");
            var table = section.Tables.FirstOrDefault(t => t.Id == tableId);
            if (table == null) throw new ArgumentException("Table not found in the specified section");

            return table;
        }

        public async Task<int> DeleteTable(int sectionId, int tableId)
        {
            var section = await _context.Sections
                .Include(s => s.Tables)
                .FirstOrDefaultAsync(s => s.Id == sectionId);

            if (section == null) throw new ArgumentException("Section not found");

            var table = section.Tables.FirstOrDefault(t => t.Id == tableId);
            if (table == null) throw new ArgumentException("Table not found in the specified section");

            //section.Tables.Remove(table);
            _context.Tables.Remove(table);
            return await _context.SaveChangesAsync();
        }
    }
}
