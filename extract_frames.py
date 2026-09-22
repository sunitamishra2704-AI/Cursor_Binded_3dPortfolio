"""
Extract 64 evenly-spaced directional frames along the 8 compass sectors:
- Sector 0 (UP -> UP-RIGHT): video frames [24 .. 50] (8 frames: indices 0..7)
- Sector 1 (UP-RIGHT -> RIGHT): video frames [50 .. 72] (8 frames: indices 8..15)
- Sector 2 (RIGHT -> DOWN-RIGHT): video frames [72 .. 90] (8 frames: indices 16..23)
- Sector 3 (DOWN-RIGHT -> DOWN): video frames [90 .. 110] (8 frames: indices 24..31)
- Sector 4 (DOWN -> DOWN-LEFT): video frames [110 .. 126] (8 frames: indices 32..39)
- Sector 5 (DOWN-LEFT -> LEFT): video frames [126 .. 140] (8 frames: indices 40..47)
- Sector 6 (LEFT -> UP-LEFT): video frames [140 .. 156] (8 frames: indices 48..55)
- Sector 7 (UP-LEFT -> UP): video frames [156 .. 168] (8 frames: indices 56..63)

Plus center.webp from frame 0 (neutral pose).
This guarantees:
- Frame 0 is EXACTLY UP (-90°)
- Frame 8 is EXACTLY UP-RIGHT (-45°)
- Frame 16 is EXACTLY RIGHT (0°)
- Frame 24 is EXACTLY DOWN-RIGHT (+45°)
- Frame 32 is EXACTLY DOWN (+90°)
- Frame 40 is EXACTLY DOWN-LEFT (+135°)
- Frame 48 is EXACTLY LEFT (180°)
- Frame 56 is EXACTLY UP-LEFT (-135°)
"""

import cv2
import os
import numpy as np

INPUT = "public/character.mp4"
OUTPUT_DIR = "public/frames"
WEBP_QUALITY = 95

# 8 compass sector bounds in the video: [start_frame, end_frame]
SECTORS = [
    (24, 50),   # UP -> UP-RIGHT
    (50, 72),   # UP-RIGHT -> RIGHT
    (72, 90),   # RIGHT -> DOWN-RIGHT
    (90, 110),  # DOWN-RIGHT -> DOWN
    (110, 126), # DOWN -> DOWN-LEFT
    (126, 140), # DOWN-LEFT -> LEFT
    (140, 156), # LEFT -> UP-LEFT
    (156, 168), # UP-LEFT -> UP
]

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    cap = cv2.VideoCapture(INPUT)
    if not cap.isOpened():
        raise RuntimeError(f"Cannot open {INPUT}")

    all_frames = []
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        all_frames.append(frame)
    cap.release()
    print(f"Loaded {len(all_frames)} frames.")

    # Save center neutral frame (frame 0)
    center_path = os.path.join(OUTPUT_DIR, "center.webp")
    cv2.imwrite(center_path, all_frames[0], [cv2.IMWRITE_WEBP_QUALITY, WEBP_QUALITY])
    print(f"Saved {center_path}")

    # Detect background color
    corners = [all_frames[0][5, 5], all_frames[0][5, -5], all_frames[0][-5, 5], all_frames[0][-5, -5]]
    avg_bgr = np.mean(corners, axis=0).astype(int)
    hex_color = f"#{avg_bgr[2]:02x}{avg_bgr[1]:02x}{avg_bgr[0]:02x}"
    print(f"Background color: {hex_color}")

    # Sample 8 frames per sector = 64 frames total
    frame_counter = 0
    names = ["UP", "UP-RIGHT", "RIGHT", "DOWN-RIGHT", "DOWN", "DOWN-LEFT", "LEFT", "UP-LEFT"]
    
    for s_idx, (start, end) in enumerate(SECTORS):
        span = end - start
        for i in range(8):
            t = i / 8.0
            video_idx = int(round(start + t * span))
            video_idx = min(video_idx, len(all_frames) - 1)
            
            out_file = os.path.join(OUTPUT_DIR, f"frame_{frame_counter:02d}.webp")
            cv2.imwrite(out_file, all_frames[video_idx], [cv2.IMWRITE_WEBP_QUALITY, WEBP_QUALITY])
            
            if i == 0:
                print(f"Frame {frame_counter:02d} -> video {video_idx} (Keyway: {names[s_idx]})")
            
            frame_counter += 1

    print(f"Successfully extracted {frame_counter} calibrated frames to {OUTPUT_DIR}/")

if __name__ == "__main__":
    main()
