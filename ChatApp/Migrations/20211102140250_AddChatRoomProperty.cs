using Microsoft.EntityFrameworkCore.Migrations;

namespace ChatApp.Migrations
{
    public partial class AddChatRoomProperty : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChatRooms_ChatMessages_ChatMessageId",
                table: "ChatRooms");

            migrationBuilder.DropIndex(
                name: "IX_ChatRooms_ChatMessageId",
                table: "ChatRooms");

            migrationBuilder.DropColumn(
                name: "ChatMessageId",
                table: "ChatRooms");

            migrationBuilder.AddColumn<int>(
                name: "ChatRoomId",
                table: "ChatMessages",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ChatMessages_ChatRoomId",
                table: "ChatMessages",
                column: "ChatRoomId");

            migrationBuilder.AddForeignKey(
                name: "FK_ChatMessages_ChatRooms_ChatRoomId",
                table: "ChatMessages",
                column: "ChatRoomId",
                principalTable: "ChatRooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChatMessages_ChatRooms_ChatRoomId",
                table: "ChatMessages");

            migrationBuilder.DropIndex(
                name: "IX_ChatMessages_ChatRoomId",
                table: "ChatMessages");

            migrationBuilder.DropColumn(
                name: "ChatRoomId",
                table: "ChatMessages");

            migrationBuilder.AddColumn<int>(
                name: "ChatMessageId",
                table: "ChatRooms",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ChatRooms_ChatMessageId",
                table: "ChatRooms",
                column: "ChatMessageId");

            migrationBuilder.AddForeignKey(
                name: "FK_ChatRooms_ChatMessages_ChatMessageId",
                table: "ChatRooms",
                column: "ChatMessageId",
                principalTable: "ChatMessages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
