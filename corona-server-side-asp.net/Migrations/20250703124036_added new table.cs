using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace corona_server_side_asp.net.Migrations
{
    /// <inheritdoc />
    public partial class addednewtable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TrafficLightProgramItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DailyScore = table.Column<double>(type: "float", nullable: false),
                    NewPatientsPer10000People = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PositiveTestsPercentage = table.Column<double>(type: "float", nullable: false),
                    VerifiedChangeRate = table.Column<double>(type: "float", nullable: false),
                    ActivePatients = table.Column<int>(type: "int", nullable: false),
                    TrafficLightProgramTableId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrafficLightProgramItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TrafficLightProgramItems_Tables_TrafficLightProgramTableId",
                        column: x => x.TrafficLightProgramTableId,
                        principalTable: "Tables",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_TrafficLightProgramItems_TrafficLightProgramTableId",
                table: "TrafficLightProgramItems",
                column: "TrafficLightProgramTableId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TrafficLightProgramItems");
        }
    }
}
