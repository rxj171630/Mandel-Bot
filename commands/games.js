const {
  Snake,
  TwoZeroFourEight,
  GuessThePokemon,
} = require("discord-gamecord");
const ms = require("ms");
const { SlashCommandBuilder } = require("discord.js");

setTimeout(() => console.log("Enabled games module"), ms("2 sec"));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("game")
    .setDescription("Play some minigames")
    .addSubcommand((subcommand) =>
      subcommand.setName("snake").setDescription("Play Snake")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("2048").setDescription("Play 2048")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("wtp").setDescription("Play Who's That Pokemon")
    ),

  async execute(client, interaction) {
    if (interaction.options.getSubcommand() == "snake") {
      const Game = new Snake({
        message: interaction,
        isSlashGame: true,
        embed: {
          title: "Snake Game",
          overTitle: "Game Over",
          color: "#5865F2",
        },
        emojis: {
          board: "⬛",
          food: "🍎",
          up: "⬆️",
          down: "⬇️",
          left: "⬅️",
          right: "➡️",
        },
        stopButton: "Stop",
        timeoutTime: 60000,
        snake: { head: "🟢", body: "🟩", tail: "🟢", over: "💀" },
        foods: ["🍎", "🍇", "🍊", "🫐", "🥕", "🥝", "🌽"],
        playerOnlyMessage: "Only {player} can use these buttons.",
      });

      Game.startGame();
    } else if (interaction.options.getSubcommand() == "2048") {
      const Game = new TwoZeroFourEight({
        message: interaction,
        isSlashGame: true,
        embed: {
          title: "2048",
          color: "#5865F2",
        },
        emojis: {
          up: "⬆️",
          down: "⬇️",
          left: "⬅️",
          right: "➡️",
        },
        timeoutTime: 60000,
        buttonStyle: "PRIMARY",
        playerOnlyMessage: "Only {player} can use these buttons.",
      });

      Game.startGame();
    } else if (interaction.options.getSubcommand() == "wtp") {
      const { GuessThePokemon } = require("discord-gamecord");

      const Game = new GuessThePokemon({
        message: interaction,
        isSlashGame: true,
        embed: {
          title: "Who's The Pokemon",
          color: "#5865F2",
        },
        timeoutTime: 60000,
        winMessage: "You guessed it right! It was a {pokemon}.",
        loseMessage: "Better luck next time! It was a {pokemon}.",
        errMessage: "Unable to fetch pokemon data! Please try again.",
        playerOnlyMessage: "Only {player} can use these buttons.",
      });

      Game.startGame();
    }
  },
};
