export default function precompileCode(code:string, lang: string, funcName:string, testCases: string, secret: string) {
    switch (lang) {
        case "js":
            return`
            const tests = ${testCases}
            const results = []
            tests.forEach((test) => {
                result = ${funcName}(...test)
                results.push(result)
            })
        
            ${code}
        
            console.log("${secret}")
            console.log(results)
            `
        break;
        case "ts":
            return`
            const tests = ${testCases}
            const results = []
            tests.forEach((test) => {
                result = ${funcName}(...test)
                results.push(result)
            })
        
            ${code}
        
            console.log("${secret}")
            console.log(results)
            `
        break;
        case "py":
            return`
tests = ${testCases}
results = []
${code}
for test in tests:
    result = ${funcName}(*test)
    results.append(result)


print("${secret}")
print(results)
            `
        break;
        case "c":
            return`
            #include <stdio.h>
            #include <stdlib.h>
            #include <string.h>
            #include <stdbool.h>
            #include <stdarg.h>
            #include <stdint.h>
        
            char* ${funcName}(int count, ...){
                va_list args;
                va_start(args, count);
                char* results = malloc(count * sizeof(char));
                for (int i = 0; i < count; i++){
                    results[i] = va_arg(args, int);
                }
                va_end(args);
                return results;
            }
        
            int main(){
                int tests[3][2] = {{1, 2}, {3, 4}, {5, 6}};
                char* results[3];
                for (int i = 0; i < 3; i++){
                    results[i] = ${funcName}(2, tests[i][0], tests[i][1]);
                }
        
                printf("${secret}");
                for (int i = 0; i < 3; i++){
                    printf("%s", results[i]);
                }
                return 0;
            }
            `
        break;
        case "cpp":
            return`
            #include <iostream>
            #include <string>
            #include <vector>
            #include <sstream>
        
            std::string ${funcName}(int count, ...){
                va_list args;
                va_start(args, count);
                std::string results = "";
                for (int i = 0; i < count; i++){
                    results += std::to_string(va_arg(args, int));
                }
                va_end(args);
                return results;
            }
        
            int main(){
                int tests[3][2] = {{1, 2}, {3, 4}, {5, 6}};
                std::string results[3];
                for (int i = 0; i < 3; i++){
                    results[i] = ${funcName}(2, tests[i][0], tests[i][1]);
                }
        
                std::cout << "${secret}";
                for (int i = 0; i < 3; i++){
                    std::cout << results[i];
                }
                return 0;
            }
            `
        break;
        case "java":
            return`
            import java.util.Arrays;
        
            public class Main {
                public static void main(String[] args) {
                    int[][] tests = {{1, 2}, {3, 4}, {5, 6}};
                    String[] results = new String[3];
                    for (int i = 0; i < 3; i++){
                        results[i] = ${funcName}(2, tests[i][0], tests[i][1]);
                    }
        
                    System.out.println("${secret}");
                    for (int i = 0; i < 3; i++){
                        System.out.print(results[i]);
                    }
                }
            }
            `
        break;
        case "cs":
            return`
            using System;
            using System.Collections.Generic;
        
            class Program
            {
                static void Main()
                {
                    int[][] tests = {{1, 2}, {3, 4}, {5, 6}};
                    string[] results = new string[3];
                    for (int i = 0; i < 3; i++){
                        results[i] = ${funcName}(2, tests[i][0], tests[i][1]);
                    }
        
                    Console.WriteLine("${secret}");
                    for (int i = 0; i < 3; i++){
                        Console.Write(results[i]);
                    }
                }
            }
            `
        break;
        case "go":
            return`
            package main
            import (
                "fmt"
                "strconv"
            )
        
            func ${funcName}(count int, args ...int) string {
                results := ""
                for _, arg := range args {
                    results += strconv.Itoa(arg)
                }
                return results
            }

            func main() {
                tests := [][]int{{1, 2}, {3, 4}, {5, 6}}
                results := make([]string, 3)
                for i, test := range tests {
                    results[i] = ${funcName}(2, test[0], test[1])
                }

                fmt.Println("${secret}")
                for _, result := range results {
                    fmt.Print(result)
                }
            }
            `
        break;
    }


}
