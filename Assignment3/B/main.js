// IIFE
(() => {

	//Choose an array method to implement for each of the incomplete functions.
	//FOR/WHILE LOOPS OF ANY KIND ARE FORBIDDEN! You must use the available array functions to accomplish your goal.

	//Remember, you can chain together array function calls to attain your goals.
	// Ex: array.filter().map()

	//Get data for the TV Show "Friends"
	fetch('http://api.tvmaze.com/shows/431?embed[]=episodes&embed[]=cast')
    .then((response) => response.json())
    .then((json) => {

        //DO NOT MODIFY THE CODE IN HERE...check the console for your functions' output

        //1 - Create a function called getGuntherCount() which returns the total number of episodes 
        // where the character Gunther is mentioned in the episode summary.
        console.log('--------------------------------');
        console.log(`Gunther Count: ${getGuntherCount(json)}`);

        //2 - Create a function called getTotalRuntimeMinutes() that totals all runtime minutes for all episodes
        console.log('--------------------------------');
        console.log(`Total Runtime Minutes: ${getTotalRuntimeMinutes(json)}`);

        //3 - Create a function called getDateRangeEpisodeCount() that returns the number of episodes that aired in the year 2000
        console.log('--------------------------------');
        console.log(`Total episodes airing in year 2000: ${getTotalEpisodesInYear(json, "2000")}`);

        //4 - Create a function called getFemaleCastMembers() that returns an array of the names of the female cast members.
        console.log('--------------------------------');
        console.log(`Female Cast Members:`);
        console.log(getFemaleCastMembers(json));

        //5 - Create a function called getEpisodeTitles() which returns a list of episode
        //    where the argument string is found in the episode summary.
        console.log('--------------------------------');
        console.log(`Episodes that mention Ursula:`);
        console.log(getEpisodeTitles(json, 'Ursula'));

        //6 - Create a function called getCastMembersOver55() which returns a list of cast members
        //    who are currently older than 55 years of age.
        console.log('--------------------------------');
        console.log(`Cast Members over 55:`);
        console.log(getCastMembersOver55(json));

        //7 - Create a function called getTotalRuntimeMinutesExcludingSeasonSix that gets the total 
        //    runtime minutes for all episodes excluding episodes in season 6
        console.log('--------------------------------');
        console.log(`Total runtime in minutes excluding Season 6: ${getTotalRuntimeMinutesExcludingSeasonSix(json)}`);
    
        //8 - Create a function called getFirstFourSeasons that gets the episodes for the first four seasons 
        //    but only return an array of JSON objects containing the season number and episode name
        console.log('--------------------------------');
        console.log(`Episode JSON for first four seasons:`)
        console.log(getFirstFourSeasons(json));

        //9 - Create a function called getEpisodeTallyBySeason that returns an object containing the season name and the total episodes as key:value pairs for each season
        console.log('--------------------------------');
        console.log(`Tally of episodes by season:`);
        console.log(getEpisodeTallyBySeason(json));

        //10 - Create a funtion called capitalizeTheFriends that transforms the episode JSON data by capitalizing the words Joey, Chandler, Monica, Rachel, Phoebe, and Ross in both 
        //the name and summary of the episodes.
        console.log('--------------------------------');
        console.log('Capitalized Friends');
        console.log(capitalizeTheFriends(json));

    })

	// COMPLETE THE FOLLOWING FUNCTIONS BY IMPLEMENTING MAP, REDUCE, OR FILTER 
	// (or a combination) ON THE PROVIDED JSON DATA

	// Define the required ten functions below this line...\

    // jsTools Function
    let replaceStrX = function(string, char, x) {
        return string.substr(0, x) + char + string.substr(x + 1, string.length)
    }

    let getGuntherCount = function(json) {
        return json._embedded.episodes.length;
    }
    
    let getTotalRuntimeMinutes = function(json) {
        let count = 0;
        return json._embedded.episodes.reduce((previous, current) => previous + current.runtime, count); 
    }
    
    let getTotalEpisodesInYear = function(json, year) {
        let count = 0;
        let n = 0;
        json._embedded.episodes.reduce((previous, current) => {
            if (current.airdate.split("-")[0] == year) {
                n = n + 1;
            }
        }, count);
        return n;
    }
    
    let getFemaleCastMembers = function(json) {
        let count = 0;
        let arr = [];
        json._embedded.cast.reduce((previous, current) => {
            if (current.person.gender == 'Female') {
                arr.push(current.person.name);
            }
        }, count);
        return arr;
    }
    
    let getEpisodeTitles = function(json, search) {
        let count = 0;
        let arr = [];
        let n = 0;
        json._embedded.episodes.reduce((previous, current) => {
            if (current.summary.includes(search)) {
                arr.push([current.name, n]);
            }
            n = n + 1;
        }, count);
        return arr;
    }
    
    let getCastMembersOver55 = function(json) {
        var year = new Date().getFullYear()
        let count = 0;
        let arr = [];
        json._embedded.cast.reduce((previous, current) => {
            if (new Date().getFullYear() - parseInt(current.person.birthday.split("-")[0]) > 55) {
                arr.push(current.person.name);
            }
        }, count);
        return arr;
    }
    
    let getTotalRuntimeMinutesExcludingSeasonSix = function(json) {
        let count = 0;
        let runtime = 0;
        json._embedded.episodes.reduce((previous, current) => {
            if (current.season != 6) {
                runtime = runtime + current.runtime;
            }
        }, count);
        return runtime;
    }
    
    let getFirstFourSeasons = function(json) {
        let count = 0;
        let arr = [];
        json._embedded.episodes.reduce((previous, current) => {
            if (current.season <= 4) {
                arr.push([current.name, current.season]);
            }
        }, count);
        return arr;
    }
    
    let getEpisodeTallyBySeason = function(json) {
        let count = 0;
        let n = 0;
        let jsonOut = {};
        let oldSeason = 1;
        json._embedded.episodes.reduce((previous, current) => {
            if (current.season != oldSeason) {
                jsonOut[oldSeason] = n;
                n = 1;
                oldSeason = current.season;
            } else {
                n = n + 1;
            }
        }, count);
        return jsonOut;
    }
    
    let capitalizeTheFriends = function(json) {
        let newJson = json;
        let count = 0;
        let countn = 0;
        let n = 0;
        let f = 0;
        json._embedded.episodes.reduce((previous, current) => {
            n = 0;
            json._embedded.cast.reduce((castPrevious, castCurrent) => {
                newJson._embedded.cast[n].person.name = replaceStrX(castCurrent.person.name, castCurrent.person.name[0].toUpperCase(), 0);
                newJson._embedded.episodes[n].name = current.name.replace(castCurrent.person.name, replaceStrX(castCurrent.person.name.split(" ")[0], castCurrent.person.name[0].toUpperCase()).split(" ")[0]);
                newJson._embedded.episodes[n].summary = current.summary.replace(castCurrent.person.name, replaceStrX(castCurrent.person.name.split(" ")[0], castCurrent.person.name[0].toUpperCase()).split(" ")[0]);
                n = n + 1;
            }, countn);
            f = f + 1;
        }, count);
        return newJson;
    }

})();

