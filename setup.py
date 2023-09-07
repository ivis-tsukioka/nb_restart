#!/usr/bin/env python

from setuptools import setup
import os
import sys
try:
    from urllib.request import urlopen
except ImportError:
    from urllib import urlopen

HERE = os.path.abspath(os.path.dirname(__file__))
VERSION_NS = {}
with open(os.path.join(HERE, 'nb_restart', '_version.py')) as f:
    exec(f.read(), {}, VERSION_NS)

LIB = os.path.join(HERE, 'nb_restart', 'nbextension', 'lib')
if not os.path.exists(LIB):
    os.mkdir(LIB)

with open(os.path.join(LIB, 'diff_match_patch.js'), 'wb') as f:
    f.write(urlopen('https://github.com/google/diff-match-patch/raw/master/javascript/diff_match_patch.js').read())

setup_args = dict (name='nb_restart',
      version=VERSION_NS['__version__'],
      description='LC multi outputs extension for Jupyter Notebook',
      packages=['nb_restart'],
      include_package_data=True,
      platforms=['Jupyter Notebook 4.2.x', 'Jupyter Notebook 5.x'],
      zip_safe=False,
      install_requires=[
          'notebook>=4.2.0',
      ]
)

if __name__ == '__main__':
    setup(**setup_args)
