#!/bin/bash

{
	while true
	do
		# Start bot
        git pull --force
		node .
		    echo "Recovering from crash!"
        echo "If you wish to completely stop the bot process now, press CTRL-C before the time is up!"
        echo "Starting up in:"
        for i in 5 4 3 2 1
        do
            echo "$i..."
            sleep 1
        done
        echo "Bot is starting up!"
    done
}
