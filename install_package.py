import os
import sys
os.system('python3 -m pip install {}'.format(sys.argv[1]))

from pylint.lint import Run

Run([sys.argv[2]], do_exit=False)