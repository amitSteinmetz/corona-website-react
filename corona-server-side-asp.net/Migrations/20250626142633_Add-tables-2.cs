using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace corona_server_side_asp.net.Migrations
{
    /// <inheritdoc />
    public partial class Addtables2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SectionModelId",
                table: "Tables",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tables_SectionModelId",
                table: "Tables",
                column: "SectionModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tables_Sections_SectionModelId",
                table: "Tables",
                column: "SectionModelId",
                principalTable: "Sections",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tables_Sections_SectionModelId",
                table: "Tables");

            migrationBuilder.DropIndex(
                name: "IX_Tables_SectionModelId",
                table: "Tables");

            migrationBuilder.DropColumn(
                name: "SectionModelId",
                table: "Tables");
        }
    }
}
