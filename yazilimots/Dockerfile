# Kullanılacak olan temel imajı belirle
FROM openjdk:17

# Çalışma dizini olarak /app'i ayarla
WORKDIR /app

# Lokaldeki yazilim_ots-0.0.1-SNAPSHOT.jar'ı /app dizinine kopyala
COPY target/yazilim_ots-0.0.1-SNAPSHOT.jar app.jar

# Docker konteyner başlatıldığında çalıştırılacak komutu belirle
ENTRYPOINT ["java", "-jar", "app.jar"]
