using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChatApp.Migrations
{
    public partial class init1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Chats_ChatId",
                table: "Users");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Chats_ChatId1",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "ChatId1",
                table: "Users",
                newName: "MemberId");

            migrationBuilder.RenameColumn(
                name: "ChatId",
                table: "Users",
                newName: "AdminId");

            migrationBuilder.RenameIndex(
                name: "IX_Users_ChatId1",
                table: "Users",
                newName: "IX_Users_MemberId");

            migrationBuilder.RenameIndex(
                name: "IX_Users_ChatId",
                table: "Users",
                newName: "IX_Users_AdminId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Chats_AdminId",
                table: "Users",
                column: "AdminId",
                principalTable: "Chats",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Chats_MemberId",
                table: "Users",
                column: "MemberId",
                principalTable: "Chats",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Chats_AdminId",
                table: "Users");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Chats_MemberId",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "MemberId",
                table: "Users",
                newName: "ChatId1");

            migrationBuilder.RenameColumn(
                name: "AdminId",
                table: "Users",
                newName: "ChatId");

            migrationBuilder.RenameIndex(
                name: "IX_Users_MemberId",
                table: "Users",
                newName: "IX_Users_ChatId1");

            migrationBuilder.RenameIndex(
                name: "IX_Users_AdminId",
                table: "Users",
                newName: "IX_Users_ChatId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Chats_ChatId",
                table: "Users",
                column: "ChatId",
                principalTable: "Chats",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Chats_ChatId1",
                table: "Users",
                column: "ChatId1",
                principalTable: "Chats",
                principalColumn: "Id");
        }
    }
}
