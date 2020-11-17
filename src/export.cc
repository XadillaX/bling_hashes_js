#include "export.h"
#include "byvoid.h"

#include <string.h>
#include <string>
#include <algorithm>

uint64* new_uint64() {
  return reinterpret_cast<uint64*>(malloc(sizeof(uint64)));
}

uint128* new_uint128() {
  return reinterpret_cast<uint128*>(malloc(sizeof(uint128)));
}

uint32 CalcCityHash32(const char* str) {
  std::string source = str;
  uint32 hash = CityHash32(str, strlen(str));
  return hash;
}

void CalcCityHash64(const char* str, void* buf) {
  std::string source = str;
  uint64 hash = CityHash64(str, strlen(str));
  memcpy(buf, &hash, sizeof(uint64));
}

void CalcCityHash128(const char* str, void* buf) {
  std::string source = str;
  uint128 hash = CityHash128(str, strlen(str));
  memcpy(buf, &hash, sizeof(uint128));
}

unsigned int CalcHash(const char* type, const char* str) {
  std::string type_str = type;
  std::transform(type_str.begin(),
                 type_str.end(),
                 type_str.begin(),
                 ::toupper);

  ByvoidHashFunc func = bkdr_hash;

  if (type_str == "SDBM") func = sdbm_hash;
  else
  if (type_str == "RS") func = rs_hash;
  else
  if (type_str == "JS") func = js_hash;
  else
  if (type_str == "PJW") func = pjw_hash;
  else
  if (type_str == "ELF") func = elf_hash;
  else
  if (type_str == "BKDR") func = bkdr_hash;
  else
  if (type_str == "DJB") func = djb_hash;
  else
  if (type_str == "AP") func = ap_hash;

  unsigned int hash = func(const_cast<char*>(str));

  return hash;
}
