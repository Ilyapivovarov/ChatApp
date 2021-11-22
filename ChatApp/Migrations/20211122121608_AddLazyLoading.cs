using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChatApp.Migrations
{
    public partial class AddLazyLoading : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChatRooms_Users_AdminId",
                table: "ChatRooms");

            migrationBuilder.AlterColumn<int>(
                name: "AdminId",
                table: "ChatRooms",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ChatRooms_Users_AdminId",
                table: "ChatRooms",
                column: "AdminId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChatRooms_Users_AdminId",
                table: "ChatRooms");

            migrationBuilder.AlterColumn<int>(
                name: "AdminId",
                table: "ChatRooms",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_ChatRooms_Users_AdminId",
                table: "ChatRooms",
                column: "AdminId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
