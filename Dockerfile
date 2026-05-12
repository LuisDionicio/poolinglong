FROM eclipse-temurin:17

WORKDIR /app

COPY . .

RUN chmod +x mvnw

RUN ./mvnw clean package

EXPOSE 8085

CMD ["java", "-jar", "target/chat-0.0.1-SNAPSHOT.jar"]