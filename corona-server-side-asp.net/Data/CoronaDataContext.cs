using corona_server_side_asp.net.Helpers;
using corona_server_side_asp.net.Models;
using corona_server_side_asp.net.Models.Cards;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace corona_server_side_asp.net.Data
{
    public class CoronaDataContext : IdentityDbContext
    {
        public CoronaDataContext(DbContextOptions<CoronaDataContext> options) : base(options) { }
        public DbSet<SectionModel> Sections { get; set; }
        public DbSet<CardModel> Cards { get; set; }
        public DbSet<TextualCardModel> TextualCardModels { get; set; }
        public DbSet<GraphicalCardModel> GraphicalCardModels { get; set; }
        public DbSet<ContainerCardModel> ContainerCardModels { get; set; }
    }
}
