# 🧩 Google Sheets Auto filtering

Automatically organizes your Google Form responses into separate sheets based on **department**, **year**, and **section** —  
creating tabs like `3CSE1`, `5ECE2`, `7ME1`, etc. in seconds.  

---
### ✨ Features
✅ Auto-detects response sheet (no need to hardcode)  
✅ Converts “Year” → “Semester” automatically (e.g., 2nd year → 3rd semester)  
✅ Groups rows by **Department + Year + Section**  
✅ Creates or refreshes sheets dynamically  
✅ Works with **any college**, **club**, or **event response form**  
✅ 100% customizable and open-source (MIT License)

---
### 🛠️ Example Use Case
If your form responses look like this:

| Timestamp | Name | Department | Year | Roll No |
|------------|------|-------------|-------|----------|
| 9/9/2025 19:28 | Aritra Hui | CSE 2 | 3rd year | 16900123100 |
| 9/9/2025 19:33 | Sristi Paul | ECE 3 | 3rd year | 151 |

It automatically creates sheets like:
- `5CSE2` → for 3rd year CSE 2
- `5ECE3` → for 3rd year ECE 3

Each tab will contain:

| Year     | Semester Prefix | Example Input | Output Sheet |
| -------- | --------------- | ------------- | ------------ |
| 1st year | 1               | CSE 1         | 1CSE1        |
| 2nd year | 3               | CSE 2         | 3CSE2        |
| 3rd year | 5               | ECE 1         | 5ECE1        |
| 4th year | 7               | ME 1          | 7ME1         |



### ⚙️ How It Works (Algorithm Overview)

1. Detects your **Form Response Sheet** automatically.  
2. Reads all responses (excluding header).  
3. Extracts key columns: Name, Department, Year, Roll.  
4. Converts “2nd year” → “3” (semester logic: `(yearNum - 1) * 2 + 1`).  
5. Merges this with department name → e.g. `3CSE1`.  
6. Groups all matching rows under that tab name.  
7. Creates new sheets (or refreshes existing ones).  
8. Adds header row + all student entries.


### How to do it :

1. Open your **Google Sheet** (with form responses).
2. Go to **Extensions → Apps Script**.
