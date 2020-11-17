#ifndef SRC_EXPORT_H_
#define SRC_EXPORT_H_

#include <emscripten/bind.h>
#include <city.h>

extern "C" {

uint32* new_uint32();
uint64* new_uint64();
uint128* new_uint128();

void CalcHash(const char* type, const char* str, void* buf);
void CalcCityHash32(const char* str, void* buf);
void CalcCityHash64(const char* str, void* buf);
void CalcCityHash128(const char* str, void* buf);

}

#endif  // SRC_EXPORT_H_
