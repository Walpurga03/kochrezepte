# Kochrezepte App

Eine moderne Web-Anwendung zur Verwaltung und Anzeige von Kochrezepten, entwickelt mit React, TypeScript und Chakra UI.

## 🌟 Features

- 📱 Responsive Design für Desktop und Mobile
- 🖼️ Ansprechende Darstellung von Rezepten mit Bildern
- 🔍 Detaillierte Ansicht für jedes Rezept
- ⏱️ Anzeige der Zubereitungszeit
- 📝 Auflistung von Zutaten und Zubereitungsschritten
- 🎨 Anpassbares Farbschema mit Chakra UI

## 🛠️ Technologien

- React
- TypeScript
- Chakra UI
- React Router
- Vite (als Build-Tool)

## 📁 Projektstruktur

```
kochrezepte-app/
│
├── public/
│   ├── images/         # Rezeptbilder
│   └── recipes/        # JSON-Datei mit Rezeptdaten
│
├── src/
│   ├── components/     # React-Komponenten
│   ├── pages/          # Seitenkomponenten
│   ├── types/          # TypeScript-Typdefinitionen
│   ├── utils/          # Hilfsfunktionen (z.B. API-Aufrufe)
│   ├── App.tsx         # Hauptkomponente
│   ├── main.tsx        # Einstiegspunkt der Anwendung
│   └── theme.ts        # Chakra UI Theme-Konfiguration
│
├── recipe_manager.py   # Python-Skript zur Rezeptverwaltung
├── README.md           # Diese Datei
├── package.json        # NPM-Paketdefinition
└── tsconfig.json       # TypeScript-Konfiguration
```

## 🚀 Installation und Setup

1. Klonen Sie das Repository:
   ```
   git clone https://github.com/yourusername/kochrezepte-app.git
   cd kochrezepte-app
   ```

2. Installieren Sie die Abhängigkeiten:
   ```
   npm install
   ```

3. Starten Sie den Entwicklungsserver:
   ```
   npm run dev
   ```

4. Öffnen Sie die Anwendung in Ihrem Browser unter `http://localhost:5173/kochrezepte`

## 📝 Rezeptverwaltung

Zur Verwaltung der Rezepte wird ein Python-Skript (`recipe_manager.py`) verwendet. Dieses Skript ermöglicht das Erstellen, Anzeigen, Aktualisieren und Löschen von Rezepten.

Führen Sie das Skript aus, um Rezepte zu verwalten:

```
python recipe_manager.py
```

## 🖼️ Hinzufügen von Bildern

Platzieren Sie die Rezeptbilder im Verzeichnis `public/images/`. Stellen Sie sicher, dass der Dateiname des Bildes mit dem `image`-Feld im entsprechenden Rezept-JSON übereinstimmt.

## 🎨 Anpassen des Designs

Das Design der Anwendung kann durch Änderung der Theme-Konfiguration in `src/theme.ts` angepasst werden. Hier können Sie Farben, Schriftarten und andere Design-Elemente nach Ihren Wünschen ändern.

## 📄 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert. Weitere Details finden Sie in der [LICENSE](LICENSE) Datei.

## 🤝 Beitragen

Als Open-Source-Projekt freuen wir uns über Beiträge jeder Art! Ob Sie Fehler melden, neue Funktionen vorschlagen oder Pull Requests einreichen möchten - Ihre Mitarbeit ist willkommen.

## 📞 Kontakt

Bei Fragen oder Anregungen können Sie mich über Nostr kontaktieren:

npub: npub1hht9umpeet75w55uzs9lq6ksayfpcvl9lk64hye75j0yj4husq5ss8xsry

## ⚡ Unterstützung

Wenn Ihnen dieses Projekt gefällt und Sie meine Motivation stärken möchten, würde ich mich sehr über eine kleine Bitcoin Lightning Spende freuen:

Lightning-Adresse: aldobarazutti@getalby.com

Ihre Unterstützung hilft mir, dieses Projekt weiter zu verbessern und neue Features zu entwickeln. Vielen Dank für Ihre Großzügigkeit!

---

Viel Spaß beim Kochen und Genießen! 🍽️👨‍🍳👩‍🍳
