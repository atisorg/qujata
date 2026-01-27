# (C) Copyright 2026 Telefónica Innovación Digital (alexandremiquel.frauamar.practicas@telefonica.com, antonio.pastorperales@telefonica.com)

from enum import Enum

class QuantumSafeAlgorithms(Enum):
    BIKEL1 = 'bikel1'
    BIKEL3 = 'bikel3'
    BIKEL5 = 'bikel5'
    MLKEM512 = 'mlkem512'
    MLKEM768 = 'mlkem768'
    MLKEM1024 = 'mlkem1024'
    FRODO640AES = 'frodo640aes'
    FRODO640SHAKE = 'frodo640shake'
    FRODO976AES = 'frodo976aes'
    FRODO976SHAKE = 'frodo976shake'
    FRODO1344AES = 'frodo1344aes'
    FRODO1344SHAKE = 'frodo1344shake'

class ClassicAlgorithms(Enum):
    PRIME256V1 = 'prime256v1'
    SECP384R1 = 'secp384r1'

class HybridAlgorithms(Enum):
    P256_MLKEM512 = 'p256_mlkem512'
    P384_MLKEM768 = 'p384_mlkem768'
    X25519MLKEM768 ='X25519MLKEM768'


