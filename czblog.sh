. /simple/venv/bin/activate
cd /simple
process=`ps aux | grep gunicorn | grep -v grep`;
if [ "$process" == "" ]; then
	echo "starting gunicorn"
	/simple/venv/bin/gunicorn -w 4 -p /tmp/gunicorn.pid czblog:app &
else
	echo "gunicorn is running"
fi
process=`ps aux | grep watchmedo | grep -v grep`;
if [ "$process" == "" ]; then
	echo "starting watchdog"
	nohup watchmedo shell-command \
         --patterns="*.py" \
	 --recursive \
         --command='kill -HUP `cat /tmp/gunicorn.pid`' /simple
else
	echo "watch dog is running"
fi
