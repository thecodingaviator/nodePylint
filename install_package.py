import os
import sys
os.system('python3 -m pip install {}'.format(sys.argv[1]))

print(sys.argv[2])

from pylint.lint import Run

Run(['./test.py'], do_exit=False)