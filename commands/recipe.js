const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const ms = require("ms");

setTimeout(() => console.log("✅ | Enabled recipe module"), ms("2 sec"));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("recipe")
    .setDescription("Recipe Information")
    .addSubcommand((subcommand) =>
      subcommand.setName("random").setDescription("Get a random recipe")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("category")
        .setDescription("Get a random recipe from a specific category")
        .addStringOption((option) =>
          option
            .setName("category")
            .setDescription("What category?")
            .setRequired(true)
            .addChoices(
              { name: "Beef", value: "beef" },
              { name: "Chicken", value: "chicken" },
              { name: "Dessert", value: "dessert" },
              { name: "Lamb", value: "lamb" },
              { name: "Miscellaneous", value: "miscellaneous" },
              { name: "Pasta", value: "pasta" },
              { name: "Pork", value: "pork" },
              { name: "Seafood", value: "seafood" },
              { name: "Side", value: "side" },
              { name: "Starter", value: "starter" },
              { name: "Vegan", value: "vegan" },
              { name: "Vegetarian", value: "vegetarian" },
              { name: "Breakfast", value: "breakfast" },
              { name: "Goat", value: "goat" }
            )
        )
    ),
  async execute(client, interaction) {
    if (interaction.options.getSubcommand() === "random") {
      query = `https://www.themealdb.com/api/json/v1/1/random.php`;
      resp = await fetch(query);
      myJSON = await resp.json();
      myJSON = myJSON.meals[0];

      //console.log(myJSON);

      const embed = new EmbedBuilder()
        .setColor(`#32a852`)
        .setTitle(myJSON.strMeal)
        .setThumbnail(myJSON.strMealThumb)
        .addFields(
          {
            name: "Category:",
            value: `${myJSON.strCategory ?? "none"}`,
            inline: false,
          },
          {
            name: "Country:",
            value: `${myJSON.strArea ?? "N/A"}`,
            inline: false,
          }
        );
      mes = "";
      ing = "";
      if (myJSON.strSource) {
        embed.setURL(myJSON.strSource);
      }
      if (myJSON.strTags != "") {
        embed.addFields({
          name: "Tags:",
          value: `${myJSON.strTags ?? "none"}`,
          inline: false,
        });
      }

      if (myJSON.strIngredient1 != null) {
        mes += myJSON.strMeasure1 + "\n";
        ing += myJSON.strIngredient1 + "\n";
      }
      if (myJSON.strIngredient2 != null) {
        mes += myJSON.strMeasure2 + "\n";
        ing += myJSON.strIngredient2 + "\n";
      }
      if (myJSON.strIngredient3 != null) {
        mes += myJSON.strMeasure3 + "\n";
        ing += myJSON.strIngredient3 + "\n";
      }
      if (myJSON.strIngredient4 != null) {
        mes += myJSON.strMeasure4 + "\n";
        ing += myJSON.strIngredient4 + "\n";
      }
      if (myJSON.strIngredient5 != null) {
        mes += myJSON.strMeasure5 + "\n";
        ing += myJSON.strIngredient5 + "\n";
      }
      if (myJSON.strIngredient6 != null) {
        mes += myJSON.strMeasure6 + "\n";
        ing += myJSON.strIngredient6 + "\n";
      }
      if (myJSON.strIngredient7 != null) {
        mes += myJSON.strMeasure7 + "\n";
        ing += myJSON.strIngredient7 + "\n";
      }
      if (myJSON.strIngredient8 != null) {
        mes += myJSON.strMeasure8 + "\n";
        ing += myJSON.strIngredient8 + "\n";
      }
      if (myJSON.strIngredient9 != null) {
        mes += myJSON.strMeasure9 + "\n";
        ing += myJSON.strIngredient9 + "\n";
      }
      if (myJSON.strIngredient10 != null) {
        mes += myJSON.strMeasure10 + "\n";
        ing += myJSON.strIngredient10 + "\n";
      }
      if (myJSON.strIngredient11 != null) {
        mes += myJSON.strMeasure11 + "\n";
        ing += myJSON.strIngredient11 + "\n";
      }
      if (myJSON.strIngredient12 != null) {
        mes += myJSON.strMeasure12 + "\n";
        ing += myJSON.strIngredient12 + "\n";
      }
      if (myJSON.strIngredient13 != null) {
        mes += myJSON.strMeasure13 + "\n";
        ing += myJSON.strIngredient13 + "\n";
      }
      if (myJSON.strIngredient14 != null) {
        mes += myJSON.strMeasure14 + "\n";
        ing += myJSON.strIngredient14 + "\n";
      }
      if (myJSON.strIngredient15 != null) {
        mes += myJSON.strMeasure15 + "\n";
        ing += myJSON.strIngredient15 + "\n";
      }
      if (myJSON.strIngredient16 != null) {
        mes += myJSON.strMeasure16 + "\n";
        ing += myJSON.strIngredient16 + "\n";
      }
      if (myJSON.strIngredient17 != null) {
        mes += myJSON.strMeasure17 + "\n";
        ing += myJSON.strIngredient17 + "\n";
      }
      if (myJSON.strIngredient18 != null) {
        mes += myJSON.strMeasure18 + "\n";
        ing += myJSON.strIngredient18 + "\n";
      }
      if (myJSON.strIngredient19 != null) {
        mes += myJSON.strMeasure19 + "\n";
        ing += myJSON.strIngredient19 + "\n";
      }
      if (myJSON.strIngredient20 != null) {
        mes += myJSON.strMeasure20 + "\n";
        ing += myJSON.strIngredient20 + "\n";
      }

      embed
        .addFields(
          {
            name: "Measurements:",
            value: mes,
            inline: true,
          },
          {
            name: "Ingredients:",
            value: ing,
            inline: true,
          }
        )
        .setTimestamp();

      if (myJSON.strYoutube != "") {
        embed.addFields({
          name: "Video Link:",
          value: myJSON.strYoutube,
          inline: false,
        });
      }
      instructions = myJSON.strInstructions;
      split1 = "";
      split2 = "";
      if (JSON.stringify(myJSON.strInstructions).length > 1900) {
        index = instructions.substring(0, 1900).lastIndexOf("\n");
        split1 = instructions.substring(0, index);
        split2 = instructions.substring(index);
      }
      await interaction.reply({ embeds: [embed] });
      await interaction.channel.send("## Instructions:");
      if (JSON.stringify(myJSON.strInstructions).length > 1900) {
        await interaction.channel.send(`\`\`\`${split1}\`\`\``);
        await interaction.channel.send(`\`\`\`${split2}\`\`\``);
      } else {
        await interaction.channel.send(`\`\`\`${instructions}\`\`\``);
      }
    } else if (interaction.options.getSubcommand() === "category")
      input = interaction.options.getString("category");
    query = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${input}`;
    resp = await fetch(query);
    myJSON = await resp.json();
    rand = Math.floor(Math.random() * myJSON.meals.length);
    myJSON = myJSON.meals[rand];
    query = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${myJSON.idMeal}`;
    resp = await fetch(query);
    myJSON = await resp.json();
    myJSON = myJSON.meals[0];

    //console.log(myJSON);

    const embed = new EmbedBuilder()
      .setColor(`#32a852`)
      .setTitle(myJSON.strMeal)
      .setThumbnail(myJSON.strMealThumb)
      .addFields(
        {
          name: "Category:",
          value: `${myJSON.strCategory ?? "none"}`,
          inline: false,
        },
        {
          name: "Country:",
          value: `${myJSON.strArea ?? "N/A"}`,
          inline: false,
        }
      );
    mes = "";
    ing = "";
    if (myJSON.strSource) {
      embed.setURL(myJSON.strSource);
    }
    if (myJSON.strTags != "") {
      embed.addFields({
        name: "Tags:",
        value: `${myJSON.strTags ?? "none"}`,
        inline: false,
      });
    }

    if (myJSON.strIngredient1 != null) {
      mes += myJSON.strMeasure1 + "\n";
      ing += myJSON.strIngredient1 + "\n";
    }
    if (myJSON.strIngredient2 != null) {
      mes += myJSON.strMeasure2 + "\n";
      ing += myJSON.strIngredient2 + "\n";
    }
    if (myJSON.strIngredient3 != null) {
      mes += myJSON.strMeasure3 + "\n";
      ing += myJSON.strIngredient3 + "\n";
    }
    if (myJSON.strIngredient4 != null) {
      mes += myJSON.strMeasure4 + "\n";
      ing += myJSON.strIngredient4 + "\n";
    }
    if (myJSON.strIngredient5 != null) {
      mes += myJSON.strMeasure5 + "\n";
      ing += myJSON.strIngredient5 + "\n";
    }
    if (myJSON.strIngredient6 != null) {
      mes += myJSON.strMeasure6 + "\n";
      ing += myJSON.strIngredient6 + "\n";
    }
    if (myJSON.strIngredient7 != null) {
      mes += myJSON.strMeasure7 + "\n";
      ing += myJSON.strIngredient7 + "\n";
    }
    if (myJSON.strIngredient8 != null) {
      mes += myJSON.strMeasure8 + "\n";
      ing += myJSON.strIngredient8 + "\n";
    }
    if (myJSON.strIngredient9 != null) {
      mes += myJSON.strMeasure9 + "\n";
      ing += myJSON.strIngredient9 + "\n";
    }
    if (myJSON.strIngredient10 != null) {
      mes += myJSON.strMeasure10 + "\n";
      ing += myJSON.strIngredient10 + "\n";
    }
    if (myJSON.strIngredient11 != null) {
      mes += myJSON.strMeasure11 + "\n";
      ing += myJSON.strIngredient11 + "\n";
    }
    if (myJSON.strIngredient12 != null) {
      mes += myJSON.strMeasure12 + "\n";
      ing += myJSON.strIngredient12 + "\n";
    }
    if (myJSON.strIngredient13 != null) {
      mes += myJSON.strMeasure13 + "\n";
      ing += myJSON.strIngredient13 + "\n";
    }
    if (myJSON.strIngredient14 != null) {
      mes += myJSON.strMeasure14 + "\n";
      ing += myJSON.strIngredient14 + "\n";
    }
    if (myJSON.strIngredient15 != null) {
      mes += myJSON.strMeasure15 + "\n";
      ing += myJSON.strIngredient15 + "\n";
    }
    if (myJSON.strIngredient16 != null) {
      mes += myJSON.strMeasure16 + "\n";
      ing += myJSON.strIngredient16 + "\n";
    }
    if (myJSON.strIngredient17 != null) {
      mes += myJSON.strMeasure17 + "\n";
      ing += myJSON.strIngredient17 + "\n";
    }
    if (myJSON.strIngredient18 != null) {
      mes += myJSON.strMeasure18 + "\n";
      ing += myJSON.strIngredient18 + "\n";
    }
    if (myJSON.strIngredient19 != null) {
      mes += myJSON.strMeasure19 + "\n";
      ing += myJSON.strIngredient19 + "\n";
    }
    if (myJSON.strIngredient20 != null) {
      mes += myJSON.strMeasure20 + "\n";
      ing += myJSON.strIngredient20 + "\n";
    }

    embed
      .addFields(
        {
          name: "Measurements:",
          value: mes,
          inline: true,
        },
        {
          name: "Ingredients:",
          value: ing,
          inline: true,
        }
      )
      .setTimestamp();

    if (myJSON.strYoutube != "") {
      embed.addFields({
        name: "Video Link:",
        value: myJSON.strYoutube,
        inline: false,
      });
    }
    instructions = myJSON.strInstructions;
    split1 = "";
    split2 = "";
    if (JSON.stringify(myJSON.strInstructions).length > 1900) {
      index = instructions.substring(0, 1900).lastIndexOf("\n");
      split1 = instructions.substring(0, index);
      split2 = instructions.substring(index);
    }
    await interaction.reply({ embeds: [embed] });
    await interaction.channel.send("## Instructions:");
    if (JSON.stringify(myJSON.strInstructions).length > 1900) {
      await interaction.channel.send(`\`\`\`${split1}\`\`\``);
      await interaction.channel.send(`\`\`\`${split2}\`\`\``);
    } else {
      await interaction.channel.send(`\`\`\`${instructions}\`\`\``);
    }
  },
};
