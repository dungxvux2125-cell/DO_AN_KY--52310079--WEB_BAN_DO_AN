import json

with open(r'c:\Users\Admin\Desktop\523100B\Untitled.mdj', 'r', encoding='utf-8') as f:
    data = json.load(f)

with open(r'c:\Users\Admin\Desktop\523100B\DOANTOTNGHIEP\mdj_summary.txt', 'w', encoding='utf-8') as out:
    def walk(elem, indent=0):
        if isinstance(elem, dict):
            _type = elem.get('_type', '')
            name = elem.get('name', '')
            if _type:
                out.write('  ' * indent + f'[{_type}] {name} (id: {elem.get("_id", "")})\n')
            
            # Attributes & Operations
            for attr in elem.get('attributes', []):
                out.write('  ' * (indent + 1) + f'- Attribute: {attr.get("name")} : {attr.get("type", "")}\n')
            for op in elem.get('operations', []):
                out.write('  ' * (indent + 1) + f'- Operation: {op.get("name")}()\n')
            for lit in elem.get('literals', []):
                out.write('  ' * (indent + 1) + f'- Literal: {lit.get("name")}\n')
                
            for k in ['ownedElements']:
                if k in elem and isinstance(elem[k], list):
                    for child in elem[k]:
                        walk(child, indent + 1)
        elif isinstance(elem, list):
            for child in elem:
                walk(child, indent)

    walk(data)

print('MDJ summary written successfully!')
