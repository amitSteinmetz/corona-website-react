using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace corona_server_side_asp.net.Migrations
{
    /// <inheritdoc />
    public partial class changetablestructure : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GeneralBedOccupancy",
                table: "Tables");

            migrationBuilder.DropColumn(
                name: "HospitalName",
                table: "Tables");

            migrationBuilder.DropColumn(
                name: "InternalDepartmentBedOccupancy",
                table: "Tables");

            migrationBuilder.AddColumn<string>(
                name: "Columns",
                table: "Tables",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "[]");

            migrationBuilder.CreateTable(
                name: "HospitalBedOccupancyItem",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HospitalName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GeneralBedOccupancy = table.Column<double>(type: "float", nullable: false),
                    InternalDepartmentBedOccupancy = table.Column<double>(type: "float", nullable: false),
                    HospitalBedOccupancyTableId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HospitalBedOccupancyItem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HospitalBedOccupancyItem_Tables_HospitalBedOccupancyTableId",
                        column: x => x.HospitalBedOccupancyTableId,
                        principalTable: "Tables",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_HospitalBedOccupancyItem_HospitalBedOccupancyTableId",
                table: "HospitalBedOccupancyItem",
                column: "HospitalBedOccupancyTableId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HospitalBedOccupancyItem");

            migrationBuilder.DropColumn(
                name: "Columns",
                table: "Tables");

            migrationBuilder.AddColumn<double>(
                name: "GeneralBedOccupancy",
                table: "Tables",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HospitalName",
                table: "Tables",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "InternalDepartmentBedOccupancy",
                table: "Tables",
                type: "float",
                nullable: true);
        }
    }
}
