dist/export.js: dist/byvoid.o dist/city.o src/export.cc src/export.h
	emcc --bind \
		-o dist/export.js src/export.cc dist/byvoid.o dist/city.o \
		-s WASM=0 \
		-s EXPORTED_FUNCTIONS="[ \
			'_new_uint32', \
			'_new_uint64', \
			'_new_uint128', \
			'_CalcHash', \
			'_CalcCityHash32', \
			'_CalcCityHash64', \
			'_CalcCityHash128' \
		]" \
		-s EXPORTED_RUNTIME_METHODS='["ccall","cwrap"]' \
		-I./deps/cityhash/src/

dist/byvoid.o: src/byvoid.c src/byvoid.h
	emcc -O2 src/byvoid.c -c -o dist/byvoid.o

deps/cityhash/config.h: deps/cityhash/configure
	cd deps/cityhash && ./configure

dist/city.o: deps/cityhash/src/city.h deps/cityhash/src/city.cc deps/cityhash/src/citycrc.h deps/cityhash/config.h
	emcc -O3 deps/cityhash/src/city.cc -c -o dist/city.o -I./deps/cityhash -I./deps/cityhash/src
