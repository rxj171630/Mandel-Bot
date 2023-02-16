const {SlashCommandBuilder} = require('discord.js');
const {EmbedBuilder} = require('discord.js');
const apiKey = process.env.lastFM;


async function fetchArt(id, myJson){
    artist = myJson.similartracks.track[id].artist.name
    if (artist.includes(' & ') && artist.toLowerCase != 'hall & oates'){
        artist = artist.substring(0, artist.indexOf(' '));
    }
    track = myJson.similartracks.track[id].name
    queryArt = `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${apiKey}&artist=${artist}&track=${track}&autocorrect=1&format=json`;
    respArt = await fetch(queryArt);
    myJsonArt = await respArt.json();
    try{
        console.log(`song: ${myJson.similartracks.track[id].name} artist: ${myJson.similartracks.track[id].artist.name} ${myJsonArt.track.album.image[3]['#text']}`);
        art = myJsonArt.track.album.image[3]['#text'];
    }
    catch(error){
        art = 'https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999'
    }
    return art;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lastfm')
        .setDescription('Get music info from Last.fm')
        .addSubcommand(subcommand =>
            subcommand
                .setName('listening')
                .setDescription('Get the info for the song currently being played')
                .addStringOption(option => 
                    option.setName('username')
                .setDescription('Enter the last.fm username to check')
                .setRequired(true)))
        .addSubcommand(subcommand=>
            subcommand
                .setName('similarsongs')
                .setDescription('Get songs that are similar to the one you ask about')
                .addStringOption(option=>
                    option.setName('songname')
                    .setDescription('Enter the song title')
                    .setRequired(true))
                .addStringOption(option=>
                    option.setName('artist')
                    .setDescription('Enter the name of the artist/band')
                    .setRequired(true))),
    async execute(interaction){
        if (interaction.options.getSubcommand() === 'listening'){
            const username = interaction.options.getString('username');
            query = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json`
            resp = await fetch(query);
            myJson = await resp.json();
            title = myJson.recenttracks.track[0].name;
            artist = myJson.recenttracks.track[0].artist['#text'];
            album = myJson.recenttracks.track[0].album['#text'];
            art = myJson.recenttracks.track[0].image[3]['#text'];
            if (album == ""){
                album = "Not Found";
                art = 'https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999'
            }

            const embed = new EmbedBuilder()
            .setColor(`#012394`)
            .addFields(
                {
                    name: 'Title:',
                    value: title,
                    inline: true
                },
                {
                    name: 'Artist:',
                    value: artist,
                    inline: true
                },
                {
                    "name": 'Album:',
                    "value": album,
                    inline: false
                }
            )
            .setImage(art);

            await interaction.reply({embeds: [embed]});
        }
        else if (interaction.options.getSubcommand() === 'similarsongs'){
            const songName = interaction.options.getString('songname');
            const artist = interaction.options.getString('artist');
            query = `http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=${artist}&track=${songName}&api_key=${apiKey}&format=json`
            resp = await fetch(query);
            myJson = await resp.json();

            query1 = `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${apiKey}&artist=${artist}&track=${songName}&format=json`
            resp1 = await fetch(query1);
            myJson1 = await resp1.json();
            try{
                art = myJson1.track.album.image[3]['#text'];
            }
            catch(error){
                art = 'https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999'
            }
            const embed = new EmbedBuilder()
            .setTitle(`Songs similar to: ${songName} by ${artist}`)
            .setColor(`#012394`)
            .setThumbnail()

            try{
            queryArt = `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${apiKey}&artist=${myJson.similartracks.track[0].artist.name}&track=${myJson.similartracks.track[0].name}&autocorrect=1&format=json`
            respArt = await fetch(queryArt);
            myJsonArt = await respArt.json();
            art = myJsonArt.track.album.image[3]['#text'];
            }
            catch(error){
                art = 'https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999'
            }
            embeds = [embed]

            for (i = 0; i < 5; i++){
                await embeds.push(new EmbedBuilder()
                .setTitle(`[${i+1}]`)
                .setColor(`#ffffff`)
                .setDescription(`${myJson.similartracks.track[i].name} by ${myJson.similartracks.track[i].artist.name}`)
                .setThumbnail(await fetchArt(i, myJson)))
            }
        
            await interaction.reply({embeds});
        }
    }
}
