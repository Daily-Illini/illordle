import sys

def merge_files(file_names):
    words_seen = set()  # holds lines already seen
    outfile = open("merged_file.txt", "w")
    
    for file_name in file_names:
        infile = open(file_name, "r")
        for line in infile:
            word = line[:-1].upper()
            if word not in words_seen and 5 <= len(word) <= 6 and word.isalpha():
                outfile.write(word + "\n")
                words_seen.add(word)
        infile.close()
    outfile.close()

if __name__ == "__main__":
    merge_files(sys.argv[1:])
