using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace corona_server_side_asp.net.Migrations
{
    /// <inheritdoc />
    public partial class testing3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ContainerCardModelId",
                table: "TextualCardModel",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ContainerCardModel",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ContainerCardModelId = table.Column<int>(type: "int", nullable: true),
                    SectionModelId = table.Column<int>(type: "int", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContainerCardModel", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ContainerCardModel_ContainerCardModel_ContainerCardModelId",
                        column: x => x.ContainerCardModelId,
                        principalTable: "ContainerCardModel",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ContainerCardModel_Sections_SectionModelId",
                        column: x => x.SectionModelId,
                        principalTable: "Sections",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "GraphicalCardModel",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Options = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ContainerCardModelId = table.Column<int>(type: "int", nullable: true),
                    SectionModelId = table.Column<int>(type: "int", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GraphicalCardModel", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GraphicalCardModel_ContainerCardModel_ContainerCardModelId",
                        column: x => x.ContainerCardModelId,
                        principalTable: "ContainerCardModel",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_GraphicalCardModel_Sections_SectionModelId",
                        column: x => x.SectionModelId,
                        principalTable: "Sections",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_TextualCardModel_ContainerCardModelId",
                table: "TextualCardModel",
                column: "ContainerCardModelId");

            migrationBuilder.CreateIndex(
                name: "IX_ContainerCardModel_ContainerCardModelId",
                table: "ContainerCardModel",
                column: "ContainerCardModelId");

            migrationBuilder.CreateIndex(
                name: "IX_ContainerCardModel_SectionModelId",
                table: "ContainerCardModel",
                column: "SectionModelId");

            migrationBuilder.CreateIndex(
                name: "IX_GraphicalCardModel_ContainerCardModelId",
                table: "GraphicalCardModel",
                column: "ContainerCardModelId");

            migrationBuilder.CreateIndex(
                name: "IX_GraphicalCardModel_SectionModelId",
                table: "GraphicalCardModel",
                column: "SectionModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_TextualCardModel_ContainerCardModel_ContainerCardModelId",
                table: "TextualCardModel",
                column: "ContainerCardModelId",
                principalTable: "ContainerCardModel",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TextualCardModel_ContainerCardModel_ContainerCardModelId",
                table: "TextualCardModel");

            migrationBuilder.DropTable(
                name: "GraphicalCardModel");

            migrationBuilder.DropTable(
                name: "ContainerCardModel");

            migrationBuilder.DropIndex(
                name: "IX_TextualCardModel_ContainerCardModelId",
                table: "TextualCardModel");

            migrationBuilder.DropColumn(
                name: "ContainerCardModelId",
                table: "TextualCardModel");
        }
    }
}
