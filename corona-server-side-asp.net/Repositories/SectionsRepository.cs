using corona_server_side_asp.net.Data;
using corona_server_side_asp.net.IRepositories;
using corona_server_side_asp.net.Models;
using Microsoft.EntityFrameworkCore;
using static System.Collections.Specialized.BitVector32;

namespace corona_server_side_asp.net.Repositories
{
    public class SectionsRepository : ISectionsRepository
    {
        private readonly CoronaDataContext _context;

        public SectionsRepository(CoronaDataContext context)
        {
            _context = context;
        }

        public async Task<List<SectionModel>> GetSectionsAsync()
        {
            return await _context.Sections.ToListAsync();
        }

        public async Task<int> AddSectionAsync(SectionModel section)
        {
            if (section == null) return -1;

            _context.Sections.Add(section);
            return await _context.SaveChangesAsync();
        }
    }
}
