#ifndef SRC_BYVOID_H_
#define SRC_BYVOID_H_

#ifdef __cplusplus
extern "C" {
#endif

unsigned int sdbm_hash(char* str);
unsigned int rs_hash(char* str);
unsigned int js_hash(char* str);
unsigned int pjw_hash(char* str);
unsigned int elf_hash(char* str);
unsigned int bkdr_hash(char* str);
unsigned int djb_hash(char* str);
unsigned int ap_hash(char* str);

typedef unsigned int (*ByvoidHashFunc)(char*);

#ifdef __cplusplus
}
#endif

#endif  // SRC_BYVOID_H_
