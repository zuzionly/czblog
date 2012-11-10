. /simple/venv/bin/activate
cd /simple
process1=`ps -A | grep gunicorn | grep -v grep`;
if [ "$process1" == "" ]; then
	echo "starting gunicorn"
	/simple/venv/bin/gunicorn -w 4 -p /tmp/gunicorn.pid czblog:app &
else
	echo "$process1"
	echo "gunicorn is running"
fi
process2=`ps -A | grep watchmedo | grep -v grep`;
if [ "$process2" == "" ]; then
	echo "starting watchdog"
	nohup watchmedo shell-command \
         --patterns="*.py" \
	 --recursive \
         --command='kill -HUP `cat /tmp/gunicorn.pid`' /simple
else
	echo "$process2"
	echo "watch dog is running"
fi
