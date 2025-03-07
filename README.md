# Code-A-Thon Competition Platform

This project is a **web-based coding competition platform** designed to provide an interactive problem-solving environment with built-in security and time-tracking features.

## Features

✅ **Full-Screen Video Introduction** – Engaging landing page with autoplay background video.  
✅ **Timed Competition** – A 90-minute countdown timer with session persistence.  
✅ **MCQ-Based Unlocking System** – Solve an MCQ to access the main coding problem.  
✅ **Integrated Coding Environment** – Monaco Editor for C programming.  
✅ **Real-Time Execution** – Uses the Piston API to compile and execute C code.  
✅ **Security Features** – Prevents right-click, tab switching, and inspect tools.  
✅ **Penalty System** – Wrong MCQ answers freeze the screen and deduct time.  
✅ **Custom Alerts & Freezing Mechanism** – Alerts for rule violations and submission handling.

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript  
- **Editor**: Monaco Editor  
- **Backend Execution**: Piston API  

## How It Works

1. The **landing page** features a full-screen video; clicking it starts the competition.
2. Users must solve an **MCQ** to unlock the **main coding challenge**.
3. The **Monaco Editor** provides a coding environment with execution capabilities.
4. A **live countdown timer** tracks remaining time.
5. **Security features** prevent unfair practices like tab switching or inspecting elements.
6. The **system freezes** the screen and deducts time for incorrect answers.

## Installation & Usage

Clone the repository and open `app.html` in a browser.

```sh
# Clone the repository
git clone https://github.com/Srinivas-018/coding_interface.git  
cd your-repo  
# Open the app.html file in your browser
```

## File Structure

```
|-- app.html         # Landing page with video intro
|-- complete.html    # Competition page with problems and editor
|-- script.js        # Handles competition logic, timer, and API calls
|-- style.css        # Styling for competition UI
```

## Future Enhancements

- Multi-language support for different programming languages.
- More security measures for preventing unfair practices.
- Advanced question randomization and adaptive difficulty.

---
### 🚀 Happy Coding & Competing!
