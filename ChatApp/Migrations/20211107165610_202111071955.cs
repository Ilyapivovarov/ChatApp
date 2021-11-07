using Microsoft.EntityFrameworkCore.Migrations;

namespace ChatApp.Migrations
{
    public partial class _202111071955 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChatRooms_Users_RoomAdminId",
                table: "ChatRooms");

            migrationBuilder.RenameColumn(
                name: "RoomAdminId",
                table: "ChatRooms",
                newName: "AdminId");

            migrationBuilder.RenameIndex(
                name: "IX_ChatRooms_RoomAdminId",
                table: "ChatRooms",
                newName: "IX_ChatRooms_AdminId");

            migrationBuilder.AddForeignKey(
                name: "FK_ChatRooms_Users_AdminId",
                table: "ChatRooms",
                column: "AdminId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChatRooms_Users_AdminId",
                table: "ChatRooms");

            migrationBuilder.RenameColumn(
                name: "AdminId",
                table: "ChatRooms",
                newName: "RoomAdminId");

            migrationBuilder.RenameIndex(
                name: "IX_ChatRooms_AdminId",
                table: "ChatRooms",
                newName: "IX_ChatRooms_RoomAdminId");

            migrationBuilder.AddForeignKey(
                name: "FK_ChatRooms_Users_RoomAdminId",
                table: "ChatRooms",
                column: "RoomAdminId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
