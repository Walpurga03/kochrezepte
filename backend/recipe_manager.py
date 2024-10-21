import json
import os
import re

RECIPES_FILE = '/home/linux/projects/kochrezepte-app/public/recipes/recipes.json'
IMAGES_DIR = '/home/linux/projects/kochrezepte-app/public/images'

def ensure_directories_exist():
    os.makedirs(os.path.dirname(RECIPES_FILE), exist_ok=True)
    os.makedirs(IMAGES_DIR, exist_ok=True)

def sanitize_filename(name):
    return re.sub(r'[^\w\-_\. ]', '_', name)

def input_float(prompt):
    while True:
        try:
            return float(input(prompt))
        except ValueError:
            print("Bitte geben Sie eine gültige Zahl ein.")

def load_recipes():
    if not os.path.exists(RECIPES_FILE):
        return []
    with open(RECIPES_FILE, 'r') as f:
        return json.load(f)

def save_recipes(recipes):
    with open(RECIPES_FILE, 'w') as f:
        json.dump(recipes, f, indent=2)

def create_recipe():
    recipes = load_recipes()
    recipe = {}
    recipe['id'] = str(max([int(r['id']) for r in recipes] + [0]) + 1)  # Generiere eine aufsteigende ID
    recipe['name'] = input("Rezeptname: ")
    recipe['preparationTime'] = int(input_float("Zubereitungszeit (in Minuten): "))
    recipe['ingredients'] = []
    
    while True:
        ingredient = {}
        ingredient['name'] = input("Zutat (oder 'fertig' zum Beenden): ")
        if ingredient['name'].lower() == 'fertig':
            break
        ingredient['amount'] = input_float("Menge: ")
        ingredient['unit'] = input("Einheit: ")
        recipe['ingredients'].append(ingredient)
    
    recipe['instructions'] = []
    print("Geben Sie die Zubereitungsschritte ein (leere Zeile zum Beenden):")
    while True:
        step = input("> ")
        if step == "":
            if not recipe['instructions']:
                print("Bitte geben Sie mindestens einen Zubereitungsschritt ein.")
                continue
            break
        recipe['instructions'].append(step)
    
    while True:
        image_name = input("Bildname (mit Erweiterung, z.B. 'spaghetti.jpg' oder 'radieschen-risotto.webp'): ")
        if not re.match(r'^[\w\-_. ]+\.(jpg|jpeg|png|gif|webp)$', image_name):
            print("Bitte geben Sie einen gültigen Bildnamen mit Erweiterung ein.")
            continue
        if not os.path.exists(os.path.join(IMAGES_DIR, image_name)):
            print(f"Warnung: Das Bild '{image_name}' wurde nicht im Ordner '{IMAGES_DIR}' gefunden.")
            if input("Möchten Sie trotzdem fortfahren? (j/n): ").lower() != 'j':
                continue
        break
    recipe['image'] = image_name  # Speichere nur den Bildnamen
    
    recipes.append(recipe)
    save_recipes(recipes)
    
    print(f"Rezept '{recipe['name']}' wurde erfolgreich gespeichert.")
    if not os.path.exists(os.path.join(IMAGES_DIR, image_name)):
        print(f"Bitte kopieren Sie das Bild '{image_name}' in den Ordner '{IMAGES_DIR}'")
        
def view_recipes():
    recipes = load_recipes()
    if not recipes:
        print("Keine Rezepte gefunden.")
        return
    
    print("\nVerfügbare Rezepte:")
    for i, recipe in enumerate(recipes, 1):
        print(f"{i}. {recipe['name']}")
    
    choice = input("\nGeben Sie die Nummer des Rezepts ein, das Sie ansehen möchten (oder 'q' zum Beenden): ")
    if choice.lower() == 'q':
        return
    
    try:
        index = int(choice) - 1
        selected_recipe = recipes[index]
        print(f"\nRezept: {selected_recipe['name']}")
        print(f"Zubereitungszeit: {selected_recipe['preparationTime']} Minuten")
        print("\nZutaten:")
        for ingredient in selected_recipe['ingredients']:
            print(f"- {ingredient['amount']} {ingredient['unit']} {ingredient['name']}")
        print("\nAnleitung:")
        for i, step in enumerate(selected_recipe['instructions'], 1):
            print(f"{i}. {step}")
        print(f"\nBild: {selected_recipe['image']}")
    except (ValueError, IndexError):
        print("Ungültige Auswahl.")

def update_recipe():
    recipes = load_recipes()
    if not recipes:
        print("Keine Rezepte zum Aktualisieren gefunden.")
        return
    
    print("\nVerfügbare Rezepte zum Aktualisieren:")
    for i, recipe in enumerate(recipes, 1):
        print(f"{i}. {recipe['name']}")
    
    choice = input("\nGeben Sie die Nummer des Rezepts ein, das Sie aktualisieren möchten (oder 'q' zum Beenden): ")
    if choice.lower() == 'q':
        return
    
    try:
        index = int(choice) - 1
        selected_recipe = recipes[index]
        
        print(f"\nAktualisiere Rezept: {selected_recipe['name']}")
        
        new_name = input(f"Neuer Name (Enter für '{selected_recipe['name']}'): ") or selected_recipe['name']
        new_time = input(f"Neue Zubereitungszeit (Enter für '{selected_recipe['preparationTime']}'): ") or selected_recipe['preparationTime']
        
        selected_recipe['name'] = new_name
        selected_recipe['preparationTime'] = int(new_time)
        
        save_recipes(recipes)
        
        print(f"Rezept '{new_name}' wurde erfolgreich aktualisiert.")
        
    except (ValueError, IndexError):
        print("Ungültige Auswahl.")

def delete_recipe():
    recipes = load_recipes()
    if not recipes:
        print("Keine Rezepte zum Löschen gefunden.")
        return
    
    print("\nVerfügbare Rezepte zum Löschen:")
    for i, recipe in enumerate(recipes, 1):
        print(f"{i}. {recipe['name']}")
    
    choice = input("\nGeben Sie die Nummer des Rezepts ein, das Sie löschen möchten (oder 'q' zum Beenden): ")
    if choice.lower() == 'q':
        return
    
    try:
        index = int(choice) - 1
        selected_recipe = recipes.pop(index)
        
        confirm = input(f"Sind Sie sicher, dass Sie das Rezept '{selected_recipe['name']}' löschen möchten? (j/n): ")
        if confirm.lower() != 'j':
            print("Löschvorgang abgebrochen.")
            return
        
        save_recipes(recipes)
        print(f"Rezept '{selected_recipe['name']}' wurde erfolgreich gelöscht.")
        
    except (ValueError, IndexError):
        print("Ungültige Auswahl.")

def main_menu():
    while True:
        print("\n--- Rezeptverwaltung ---")
        print("1. Rezept erstellen")
        print("2. Rezepte anzeigen")
        print("3. Rezept aktualisieren")
        print("4. Rezept löschen")
        print("5. Beenden")
        
        choice = input("Wählen Sie eine Option: ")
        
        if choice == '1':
            create_recipe()
        elif choice == '2':
            view_recipes()
        elif choice == '3':
            update_recipe()
        elif choice == '4':
            delete_recipe()
        elif choice == '5':
            print("Auf Wiedersehen!")
            break
        else:
            print("Ungültige Auswahl. Bitte versuchen Sie es erneut.")

if __name__ == "__main__":
    ensure_directories_exist()
    main_menu()