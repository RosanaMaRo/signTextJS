signtextjs_plus: ../signtextjs_plus.cpp ../config.h
	g++ -Wall -O2 -g -I/usr/include/jsoncpp -I/usr/local/opt/nspr/include \
		-I/usr/local/opt/nspr/include/nspr \
		-I/usr/local/opt/nss/include -L/usr/local/opt/nspr/lib \
		-L/usr/local/opt/nss/lib -o $@ $< -ljsoncpp -lnspr4 -lnss3 \
		-lsmime3

../config.h: ../../webextension/manifest.json
	../gen-config < $< > $@
